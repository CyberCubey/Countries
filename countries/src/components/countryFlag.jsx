function CountryFlag({ country, onClick }) {



  return (
<div className="card" onClick={onClick}>
<h2>{country.emoji}</h2>
<p>{country.name}</p>

</div>
)}

export default CountryFlag