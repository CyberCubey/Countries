import { useEffect, useState } from "react"
const API = "https://countries.trevorblades.com/graphql"


function unicodeToEmoji(unicode) {
  return unicode
    .split(" ")
    .map(u => String.fromCodePoint(parseInt(u.replace("U+", ""), 16)))
    .join("")
} // used Copilot to give unicodeToeEmoji answer, prompt "help me with making this special-text into a functional emoji, in JSX code" etc

function App() {

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)


  const query = `
  query Countries {
    countries {
      name
      emojiU
      currency
      phone
      languages {
        name
}
    }
  }
  `

  // note to self: do more components

  // reason: want to clarify, that emojiU doesn't really work, because Chrome doesn't really allow flags anymore for some reason,
  // more like these acronyms for them instead. But they still function as a emoji, they are technically still the flag emojis
  // (they act like a single thing, nor actual letters, and show up when you copy them into google as a emoji search), so it works? 👍👍

  //example url, search of 🇼🇫, 'Wallis and Futuna', https://www.google.com/search?q=%F0%9F%87%BC%F0%9F%87%AB&oq=%F0%9F%87%BC%F0%9F%87%AB&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIMCAUQABgUGIcCGIAEMgcIBhAAGIAEMgcIBxAAGO8F0gEHMzAwajBqN6gCALACAA&sourceid=chrome&ie=UTF-8


  useEffect(() => {

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(data => setCountries(data.data.countries))

  }, [])


  return (
    <div>
      <div className="grid" className="container">
        {countries.map(country => (
          <div
            key={country.name} //display information on card
            className="card"
            onClick={() => setSelectedCountry(country)}
          >

            <h2>{unicodeToEmoji(country.emojiU)}</h2>
            <p>{country.name}</p>
          </div> // /*IAC means INTERNATIONAL ACCESS CODE, i.e. the ID code e.g. '+45'*/
        ))}
      
      </div>


      
      {selectedCountry && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setSelectedCountry(null)}>Close</button> 
          
            <h2>
              {unicodeToEmoji(selectedCountry.emojiU)} {selectedCountry.name}
            </h2>

            <p><b>Currency:</b> {selectedCountry.currency || "None"}</p>
            <p><b>Phone-IAC:</b> +{selectedCountry.phone}</p>

            <p>
              <b>Languages:</b>{" "}
              {selectedCountry.languages.length > 0
              ? selectedCountry.languages.map(l => l.name).join(", "): "None"} 
          </p>
          </div>

        </div> // tells what the api to fetch and display // language: needed help from Copilot to help figure out languages code,
        // cause I couldn't get it to function properly, and apparently needed a different seperate code from the others
      )}

    

      <footer>
        <p>Jonathan, <a href="https://github.com/CyberCubey/Countries">github</a>, 2026</p>
        <a href="https://countries.trevorblades.com/graphql">Countries GraphQL API</a>
      </footer>

    </div> // if i had more time, i could maybe have done a searchbar, emphasis on maybe
  )
}

export default App
