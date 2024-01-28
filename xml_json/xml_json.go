package xml_json

import (
	"bytes"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"strings"

	xj "github.com/basgys/goxml2json"
)

func check(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

func ParseXml(xml string) string {
	thisxml := strings.NewReader(xml)
	json, err := xj.Convert(thisxml)
	check(err)
	return json.String()
}

type Xmlfile struct {
	Jsonstruct string
}

func HandleXML(w http.ResponseWriter, r *http.Request) {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {})
	if r.Method == "GET" {
		t, err := template.ParseFiles("./xml_json/templates/xtj.html")
		check(err)
		t.Execute(w, nil)
	} else {
		r.ParseForm()

		xmlFile, _, errF := r.FormFile("xml_file")
		check(errF)
		defer xmlFile.Close()

		buf := bytes.NewBuffer(nil)
		_, err := io.Copy(buf, xmlFile)
		check(err)
		bytesBuf := buf.Bytes()

		fmt.Println(bytesBuf)

		parseXmlFromFile := ParseXml(string(bytesBuf))

		// xmlData := r.Form.Get("entered_xml")
		// jsonData := ParseXml(xmlData)

		// myUser := Xmlfile{}
		// myUser.Jsonstruct = jsonData
		t, err := template.ParseFiles("./xml_json/templates/xtj_response.html")
		check(err)
		t.Execute(w, parseXmlFromFile)
	}
}
