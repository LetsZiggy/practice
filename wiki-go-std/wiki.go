package main

import (
	fmt "fmt"
	log "log"
	http "net/http"
)

type Page struct {
	Title string
	Body  []byte
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "r.URL.Path %s", r.URL.Path)
	fmt.Fprintf(w, "\n")
	fmt.Fprintf(w, "r.URL.Path[1:] %s", r.URL.Path[1:])
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
