package siteParis;


public class Competiteur {

	/**
	 * le nom du competiteur, min length :  2 characters
	 * @uml.property  name="nom"
	 */
	private String nom = "";

	/**
	 * Getter of the property <tt>nom</tt>
	 * @return  Returns the nom.
	 * @uml.property  name="nom"
	 */
	public String getNom() {
		return nom;
	}

	/**
	 * Setter of the property <tt>nom</tt>
	 * @param nom  The nom to set.
	 * @uml.property  name="nom"
	 */
	public void setNom(String nom) {
		this.nom = nom;
	}


	/**
	 */
	public boolean equal(String nom){
		if (this.nom.equals(nom))  {
			return true;
		} else
			return false;
	}


	/**
	 */
	public Competiteur(String nom) throws CompetitionException{
		if (nom==null) throw new CompetitionException();
		if (!nom.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
		this.nom = nom;
	}

}
