package main

import (
	fmt "fmt"
	log "log"
	http "net/http"
	os "os"
)

type Page struct {
	Title string
	Body  []byte
}

func (page *Page) save() error {
	filename := page.Title + ".txt"
	return os.WriteFile(filename, page.Body, 0o600)
}

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/view/"):]
	page, err := loadPage(title)
	if err != nil {
		log.Println(err)
		page = &Page{Title: "No Such Page", Body: []byte("~~~NIL~~~")}
	}

	fmt.Fprintf(w, "<h3>%s</h3><p>%s</p>", page.Title, page.Body)
}

func main() {
	http.HandleFunc("/view/", viewHandler)
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
