package siteParis;


public class Mise {

	/**
	 * la somme de jeton mise par le joueur
	 * @uml.property  name="jetons"
	 */
	private double jetons = 0.0;

	/**
	 * Getter of the property <tt>jetons</tt>
	 * @return  Returns the jetons.
	 * @uml.property  name="jetons"
	 */
	public double getJetons() {
		return jetons;
	}

	/**
	 * Setter of the property <tt>jetons</tt>
	 * @param jetons  The jetons to set.
	 * @uml.property  name="jetons"
	 */
	public void setJetons(double jetons) {
		this.jetons = jetons;
	}

	/**
	 * @uml.property  name="joueur"
	 * @uml.associationEnd  multiplicity="(1 1)" inverse="mise:siteParis.Joueur"
	 * @uml.association  name="mettre"
	 */
	private Joueur joueur;

	/**
	 * Getter of the property <tt>joueur</tt>
	 * @return  Returns the joueur.
	 * @uml.property  name="joueur"
	 */
	public Joueur getJoueur() {
		return joueur;
	}

	/**
	 * Setter of the property <tt>joueur</tt>
	 * @param joueur  The joueur to set.
	 * @uml.property  name="joueur"
	 */
	public void setJoueur(Joueur joueur) {
		this.joueur = joueur;
	}

	/**
	 * Le vainqueur choisi par le joueur
	 * @uml.property  name="competiteurChoisi"
	 */
	private String competiteurChoisi = "";

	/**
	 * Getter of the property <tt>competiteurChoisi</tt>
	 * @return  Returns the competiteurChoisi.
	 * @uml.property  name="competiteurChoisi"
	 */
	public String getCompetiteurChoisi() {
		return competiteurChoisi;
	}

	/**
	 * Setter of the property <tt>competiteurChoisi</tt>
	 * @param competiteurChoisi  The competiteurChoisi to set.
	 * @uml.property  name="competiteurChoisi"
	 */
	public void setCompetiteurChoisi(String competiteurChoisi) {
		this.competiteurChoisi = competiteurChoisi;
	}

		
		/**
		 */
		public Mise(double jetons, Joueur joueur, String vainqueurNom){
			this.jetons = jetons;
			this.joueur = joueur;
			this.competiteurChoisi = vainqueurNom;
		}

}
