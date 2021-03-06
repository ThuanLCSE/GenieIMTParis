package siteParis;


public class Joueur {

	/**
	 * Nom de joueur, min length : 2 characters
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
	 * Prenom du joueur, min length : 2 characters
	 * @uml.property  name="prenom"
	 */
	private String prenom = "";

	/**
	 * Getter of the property <tt>prenom</tt>
	 * @return  Returns the prenom.
	 * @uml.property  name="prenom"
	 */
	public String getPrenom() {
		return prenom;
	}

	/**
	 * Setter of the property <tt>prenom</tt>
	 * @param prenom  The prenom to set.
	 * @uml.property  name="prenom"
	 */
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	/**
	 * Le pseudo du joueur, min length : 1 character
	 * @uml.property  name="pseudo"
	 */
	private String pseudo = "";

	/**
	 * Getter of the property <tt>pseudo</tt>
	 * @return  Returns the pseudo.
	 * @uml.property  name="pseudo"
	 */
	public String getPseudo() {
		return pseudo;
	}

	/**
	 * Setter of the property <tt>pseudo</tt>
	 * @param pseudo  The pseudo to set.
	 * @uml.property  name="pseudo"
	 */
	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}


	/**
	 */
	public String toString(){
		return this.nom + " " +this.prenom + " " +this.pseudo + " " +(long) this.jetonRestant + " " +(long) this.jetonsEngages;
	}

	/**
	 * le password du joueur, min length : 6 characters, contient au moins 1 chiffre
	 * @uml.property  name="password"
	 */
	private String password = "";

	/**
	 * Getter of the property <tt>password</tt>
	 * @return  Returns the password.
	 * @uml.property  name="password"
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Setter of the property <tt>password</tt>
	 * @param password  The password to set.
	 * @uml.property  name="password"
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * la somme en jetons du joueur
	 * @uml.property  name="jetonRestant"
	 */
	private double jetonRestant = 0.0;

	/**
	 * Getter of the property <tt>jetons</tt>
	 * @return  Returns the jetons.
	 * @uml.property  name="jetonRestant"
	 */
	public long getJetonRestant() {
		return (long) jetonRestant;
	}

	/**
	 * Setter of the property <tt>jetons</tt>
	 * @param jetons  The jetons to set.
	 * @uml.property  name="jetonRestant"
	 */
	public void setJetonRestant(double jetonRestant) {
		this.jetonRestant = jetonRestant;
	}

	/**
	 * le total de jetons engages dans les mises en cours
	 * @uml.property  name="jetonsEngages"
	 */
	private double jetonsEngages;

	/**
	 * Getter of the property <tt>jetonsEngages</tt>
	 * @return  Returns the jetonsEngages.
	 * @uml.property  name="jetonsEngages"
	 */
	public double getJetonsEngages() {
		return jetonsEngages;
	}

	/**
	 * Setter of the property <tt>jetonsEngages</tt>
	 * @param jetonsEngages  The jetonsEngages to set.
	 * @uml.property  name="jetonsEngages"
	 */
	public void setJetonsEngages(double jetonsEngages) {
		this.jetonsEngages = jetonsEngages;
	}

	/**
<<<<<<< HEAD
	 * Comparer avec un autre joueur par le même nom et prenom ou le même pseudo
	 * @return true si ils ont le même nom et prenom ou le même pseudo
=======
	 * Comparer avec un autre joueur par le même nom et prenom ou le meme pseudo
	 * @return true si ils ont le même nom et prenom ou le meme pseudo
>>>>>>> branch 'master' of https://github.com/ThuanLCSE/GenieIMTParis.git
	 */
	public boolean equal(String nom, String prenom, String pseudo){
		if ((this.nom.equals(nom) && this.prenom.equals(prenom)) || this.pseudo.equals(pseudo))  {
			return true;
		} else
			return false;
	}
	/**
	 * Comparer avec un autre joueur par le même nom, prenom et pseudo
	 * @return true si ils ont le même nom, prenom et pseudo
	 */
	public boolean equalTous(String nom, String prenom, String pseudo){
		if (this.nom.equals(nom) && this.prenom.equals(prenom) && this.pseudo.equals(pseudo))  {
			return true;
		} else
			return false;
	}
	
	/**
	 * @throws JoueurException levée si <code>nom</code>,
	 * <code>prenom</code>, <code>pseudo</code> sont invalides.
	 */
	public Joueur(String nom, String prenom, String pseudo) throws JoueurException{
		if (nom==null) throw new JoueurException();
		if (prenom==null) throw new JoueurException();
		if (pseudo==null) throw new JoueurException();
		if (!nom.matches("[A-Za-z]+")) throw new JoueurException();
		if (!prenom.matches("[^ ][A-Za-z]*")) throw new JoueurException();
		if (!pseudo.matches("[A-Za-z0-9]{4,}")) throw new JoueurException();
		this.nom = nom;
		this.prenom = prenom;
		this.pseudo = pseudo;
	}

	/**
	 * diminuer la somme de jeton restant du joueur
	 * @param jetons : la somme a diminuer
	 * @return true si la somme de jeton restant est positive
	 */
	public void diminuerJeton(double jetons){
		this.jetonRestant = this.jetonRestant - jetons;
		return ;
	}

	/**
	 * augmanter la somme de jeton restant du joueur
	 * @param jetons : la somme a augmenter
	 * @return true si la somme de jeton restant est positive
	 */
	public boolean augmenterJeton(double jeton){
		this.jetonRestant += jeton;
		return this.jetonRestant >= 0 ? true: false;
	}

	/**
	 * valider le nom, prenom, pseudo pour un joueur
	 * @param nom2
	 * @param prenom2
	 * @param pseudo2
	 * @throws JoueurException levée si <code>nom</code>, <code>prenom</code>,
	 * <code>pseudo</code> sont invalides.
	 */
	public static void validiteNomPrenomPseudo(String nom2, String prenom2, String pseudo2) throws JoueurException{
		if (nom2==null) throw new JoueurException();
		if (prenom2==null) throw new JoueurException();
		if (pseudo2==null) throw new JoueurException();
		if (!nom2.matches("[A-Za-z]+")) throw new JoueurException();
		if (!prenom2.matches("[^ ][A-Za-z]*")) throw new JoueurException();
		if (!pseudo2.matches("[A-Za-z0-9]{4,}")) throw new JoueurException();

	}

	/**
<<<<<<< HEAD
	 * verifier si le password en paramètre avait le même valeur du mot de pass
	 * ,quand le pseudo en paramètre ait le même valeur
	 * @param pseudo2
	 * @param passwordJoueur
	 * @return true si le pseudo, et le passwordJoueur ont le même valeur avec
=======
	 * verifier si le password en parametre avait le meme valeur du mot de pass
	 * ,quand le pseudo en parametre ait le meme valeur
	 * @param pseudo2
	 * @param passwordJoueur
	 * @return true si le pseudo, et le passwordJoueur ont le meme valeur avec
>>>>>>> branch 'master' of https://github.com/ThuanLCSE/GenieIMTParis.git
	 * le pseudo et password du joueur
	 */
	public boolean equalPassword(String pseudo2, String passwordJoueur) {
		if ((this.pseudo.equals(pseudo2) && this.password.equals(passwordJoueur)))  {
			return true;
		} else
			return false;
	}

	/**
	 * valider le pseudo et password pour un joueur
	 * @param pseudo2
	 * @param password
	 * @throws JoueurException levée si <code>password</code> ou
	 * <code>pseudo</code> sont invalides.
	 */
	public static void validitePseudoPassword(String pseudo2, String password) throws JoueurException {
		if (pseudo2==null) throw new JoueurException();
		if (!pseudo2.matches("[A-Za-z0-9]{4,}")) throw new JoueurException();
		if (password == null) throw new JoueurException();
		if (password.length() < 8 ) throw new JoueurException();
		if (password.contains(" ")) throw new JoueurException();
		if (password.contains("-")) throw new JoueurException();
	}

}
