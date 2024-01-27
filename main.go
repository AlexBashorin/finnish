package main

import (
	"net/http"

	xml_json "fin/xml_json"
)

func main() {
	http.HandleFunc("/xtj", xml_json.HandleXML)
	http.ListenAndServe(":81", nil)
}

// func home(w http.ResponseWriter, r *http.Request) {
// 	// get json data
// 	f, err := os.Open("./source_data/qa.json")
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	defer f.Close()
// 	byteV, _ := io.ReadAll(f)
// 	json.Unmarshal(byteV, &content)

// 	var data Domdata
// 	data.PageTitle = "Translate word to finnish"
// 	data.EngValue = content[0].Eng
// 	data.Answer = content[0].Fin

// 	filename := "index.html"
// 	render(w, filename, data)
// }

// func render(w http.ResponseWriter, filename string, data interface{}) {
// 	tmpl, err := template.ParseFiles(filename)
// 	if err != nil {
// 		log.Print(err)
// 		http.Error(w, "Sorry, something went wrong", http.StatusInternalServerError)
// 		return
// 	}

// 	if err := tmpl.Execute(w, data); err != nil {
// 		log.Print(err)
// 		http.Error(w, "Sorry, something went wrong", http.StatusInternalServerError)
// 	}
// }
