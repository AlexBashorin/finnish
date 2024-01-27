package xml_json

import (
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

func HandleXML(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("test"))
}
