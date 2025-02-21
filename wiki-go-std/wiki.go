package main

import (
	fmt "fmt"
	log "log"
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

func main() {
	pageTest1 := &Page{Title: "TestPage", Body: []byte("This is a test page.")}
	pageTest1.save()
	pageTest2, err := loadPage("TestPage")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(pageTest2.Body))
}
