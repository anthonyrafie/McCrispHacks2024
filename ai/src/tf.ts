


// Function to extract words from a string
function getWordsFromString(input: string): string[] {
    const words = input.replace(/[^\w\s]/g, '').split(/\s+/);
    return words;
}

// URL to fetch stopwords from
const stop_words_url = "https://gist.githubusercontent.com/larsyencken/1440509/raw/53273c6c202b35ef00194d06751d8ef630e53df2/stopwords.txt"


// Asynchronously fetches stopwords from the provided URLà
async function getStopWords(): Promise<string[]> {
    const response = await fetch(stop_words_url);
    const stop_words = await response.text();
    return getWordsFromString(stop_words);
}

// Removes stopwords from the input string
async function removeStopWordsFromText(input: string): Promise<string[]> {
    const words = getWordsFromString(input);
    const stopWords = await getStopWords();
    const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
    return filteredWords;
}

// Calculates word frequencies in the input string after removing stopwords
async function getWordFrequencies(input: string): Promise<Map<string, number>> {
    const words = await removeStopWordsFromText(input);
    const wordFrequencies = new Map<string, number>();
    words.forEach(word => {
        if (wordFrequencies.has(word)) {
            wordFrequencies.set(word, wordFrequencies.get(word)! + 1);
        } else {
            wordFrequencies.set(word, 1);
        }
    });
    return wordFrequencies;
}
