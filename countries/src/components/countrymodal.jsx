function CountryModal({ country, onClose }) {



return (
    <div className="modal">
    <div className="modal-content">

    <button className="close" onClick={onClose}>X</button>
    /*doesn't work for some reason, there isn't a X, just the CLOSE button*/

    /*should've done the entire modal in here, note to self */
</div></div>
  )

}


export default CountryModal


