package main

import (
	"errors"
	"fmt"
	html "html/template"
	"log"
	"net/http"
	"os"
	re "regexp"
)

type Page struct {
	Title string
	Body  []byte
	IsNew bool
}

type IndexPage struct {
	Title string
	Pages []string
}

var (
	templates = html.Must(html.ParseFiles("tmpl/edit.html", "tmpl/frontpage.html", "tmpl/view.html"))
	validPath = re.MustCompile("^/((?:edit)|(?:save)|(?:view))/([a-zA-Z0-9]+)$")
)

func (page *Page) save() error {
	filename := "data/" + page.Title + ".txt"
	return os.WriteFile(filename, page.Body, 0o600)
}

func loadPage(title string) (*Page, error) {
	filename := "data/" + title + ".txt"
	body, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	return &Page{Title: title, Body: body}, nil
}

func renderTemplate(w http.ResponseWriter, tmpl string, page *Page) {
	err := templates.ExecuteTemplate(w, tmpl+".html", page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func getTitle(w http.ResponseWriter, r *http.Request) (string, error) {
	match := validPath.FindStringSubmatch(r.URL.Path)
	if match == nil {
		http.NotFound(w, r)

		return "", errors.New("invalid page title")
	}

	return match[2], nil
}

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		match := validPath.FindStringSubmatch(r.URL.Path)
		if match == nil {
			http.NotFound(w, r)

			return
		}

		fn(w, r, match[2])
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	page := &IndexPage{}

	match := validPath.FindStringSubmatch(r.URL.Path)
	if match == nil {
		http.NotFound(w, r)

		return
	}
	page.Title = match[2]

	files, err := os.ReadDir("./data")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	page.Pages = make([]string, len(files), len(files))
	for i, file := range files {
		len := len(file.Name())
		page.Pages[i] = file.Name()[:len-4]
	}

	err = templates.ExecuteTemplate(w, "frontpage.html", page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
	page, err := loadPage(title)
	if err != nil {
		http.Redirect(w, r, "/edit/"+title, http.StatusFound)

		return
	}

	renderTemplate(w, "view", page)
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
	page, err := loadPage(title)
	if err != nil {
		page = &Page{Title: title, IsNew: true}
	}

	renderTemplate(w, "edit", page)
}

func saveHandler(w http.ResponseWriter, r *http.Request, title string) {
	body := r.FormValue("body")
	page := &Page{Title: title, Body: []byte(body)}

	err := page.save()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

func main() {
	http.Handle("/", http.RedirectHandler("/view/frontpage", http.StatusFound))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	http.HandleFunc("/view/frontpage", indexHandler)
	http.HandleFunc("/view/", makeHandler(viewHandler))
	http.HandleFunc("/edit/", makeHandler(editHandler))
	http.HandleFunc("/save/", makeHandler(saveHandler))

	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
