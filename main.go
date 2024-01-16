package main

import (
	"encoding/json"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
)

type JsonData struct {
	Eng string `json:"eng"`
	Fin string `json:"fin"`
}
type Domdata struct {
	PageTitle string
	EngValue  string
	Answer    string
}

var content []JsonData

func main() {
	http.HandleFunc("/", home)
	http.HandleFunc("/check", func(w http.ResponseWriter, r *http.Request) {

		finW := r.FormValue("finword")
		var ans string
		if content[0].Fin == finW {
			ans = "correct: " + content[0].Fin + " == " + finW
		} else {
			ans = "wrong: " + content[0].Fin + " != " + finW
		}
		w.Write([]byte(ans))
	})

	http.ListenAndServe(":80", nil)
}

func home(w http.ResponseWriter, r *http.Request) {
	// get json data
	f, err := os.Open("./source_data/qa.json")
	if err != nil {
		log.Println(err)
	}
	defer f.Close()
	byteV, _ := io.ReadAll(f)
	json.Unmarshal(byteV, &content)

	var data Domdata
	data.PageTitle = "Translate word to finnish"
	data.EngValue = content[0].Eng
	data.Answer = content[0].Fin

	filename := "index.html"
	render(w, filename, data)
}

func render(w http.ResponseWriter, filename string, data interface{}) {
	tmpl, err := template.ParseFiles(filename)
	if err != nil {
		log.Print(err)
		http.Error(w, "Sorry, something went wrong", http.StatusInternalServerError)
		return
	}

	if err := tmpl.Execute(w, data); err != nil {
		log.Print(err)
		http.Error(w, "Sorry, something went wrong", http.StatusInternalServerError)
	}
}
