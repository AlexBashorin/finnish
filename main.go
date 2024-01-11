package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"os"
	"strings"
)

type Compare struct {
	Eng string `json:"eng"`
	Fin string `json:"fin"`
}

func main() {
	// how many words
	var countWords int
	fmt.Println("Выбери количество слов на сегодня")
	_, err := fmt.Scanln(&countWords)
	if err != nil {
		fmt.Printf("Введенное значение неверно: %v", err)
	}
	fmt.Printf("Количество слов: %d\n", countWords)

	// read source json
	fJson, err := os.Open("qa.json")
	if err != nil {
		fmt.Printf("didn't open json")
	}
	defer fJson.Close()

	byteValue, _ := io.ReadAll(fJson)

	var langs []Compare
	json.Unmarshal(byteValue, &langs)

	randIndex := rand.Intn(len(langs))
	choosenPart := langs[randIndex:(randIndex + countWords)]

	// compare to finn words
	type FinWords struct {
		fact   string
		byUser string
	}
	var finWords []FinWords

	for _, word := range choosenPart {
		fmt.Printf("Переведи слово на финский: %s\n", word.Eng)
		text, _ := bufio.NewReader(os.Stdin).ReadString('\n')

		fmt.Printf("Введенное слово: %s\n", text)

		var item FinWords
		item.fact = strings.TrimSpace(word.Fin)
		item.byUser = strings.TrimSpace(text)
		finWords = append(finWords, item)
	}

	var countRights []string

	for w := 0; w < len(finWords); w++ {
		if finWords[w].fact == finWords[w].byUser {
			countRights = append(countRights, finWords[w].byUser)
		}
	}

	fmt.Printf("Количество верных ответов: %d\n", len(countRights))
	fmt.Printf("Правильные варианты: %v\n", countRights)
	fmt.Printf("Процент правильных ответов: %.2f\n", float32(len(countRights))/float32(countWords))
}
