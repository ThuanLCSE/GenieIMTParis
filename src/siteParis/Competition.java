package siteParis;

import java.util.Date;
import java.util.Collection;
import java.util.ArrayList;


public class Competition {

	public static final String EN_ATTENTE = "en attente";
	public static final String SOLDEE = "soldée";
	/**
	 * le nom de la competition, min length : 3 characters
	 * @uml.property  name="nom"
	 */
	private String nom = "";
	/**
	 * le statut d'une competition
	 * le valeur par defaut est "en attente"
	 */
	private String statut = EN_ATTENTE;


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
	 * le nom du vainqueur de la competition, min length : 2 characters
	 * @uml.property  name="vainqueur"
	 */
	private String vainqueur = "";

	/**
	 * Getter of the property <tt>vainqueur</tt>
	 * @return  Returns the vainqueur.
	 * @uml.property  name="vainqueur"
	 */
	public String getVainqueur() {
		return vainqueur;
	}

	/**
	 * Setter of the property <tt>vainqueur</tt>
	 * @param vainqueur  The vainqueur to set.
	 * @uml.property  name="vainqueur"
	 */
	public void setVainqueur(String vainqueur) throws CompetitionException {
		if (!this.rechercherNomCompetiteur(vainqueur)) throw new CompetitionException();
		this.vainqueur = vainqueur;
	}

	/**
	 * la date de cloture de la competition
	 * @uml.property  name="dateCloture"
	 */
	private DateFrancaise dateCloture;

	/**
	 * Getter of the property <tt>dateCloture</tt>
	 * @return  Returns the dateCloture.
	 * @uml.property  name="dateCloture"
	 */
	public DateFrancaise getDateCloture() {
		return dateCloture;
	}

	/**
	 * Setter of the property <tt>dateCloture</tt>
	 * @param dateCloture  The dateCloture to set.
	 * @uml.property  name="dateCloture"
	 */
	public void setDateCloture(DateFrancaise dateCloture) throws CompetitionException {
		if (dateCloture == null) throw new CompetitionException();
		if (dateCloture.estDansLePasse()) throw new CompetitionException();

		this.dateCloture = dateCloture;
	}


	/**
	 */
	public String toString(){
		return "";
	}

	/**
	 * Le tableau des competiteur d'une competition
	 * @uml.property  name="competiteurs"
	 * @uml.associationEnd  multiplicity="(0 -1)" ordering="true" inverse="competition:siteParis.Competiteur"
	 * @uml.association  name="contenir"
	 */
	private ArrayList<Competiteur> competiteurs = new java.util.ArrayList<Competiteur>();
	public ArrayList<Competiteur> getCompetiteurs() {
		return competiteurs;
	}

	/**
	 * Attribuer les competiteurs dans une competition
	 * @param competiteurs : un tableau des noms du competiteur
	 * @throws MetierException levée si le tableau des
	 * compétiteurs n'est pas instancié
	 * @throws CompetitionException levée si le nom de la
	 * compétition ou des compétiteurs sont invalides, si il y a
	 * moins de 2 compétiteurs, si un des competiteurs n'est pas instancié,
	 * si deux compétiteurs ont le même nom
	 */
	public void setCompetiteurs(String[] competiteurs) throws CompetitionException, MetierException {
		if (competiteurs == null) throw new MetierException();
		if (competiteurs.length < 2) throw new CompetitionException();
		for (String nom : competiteurs) {
			if (nom == null) throw new CompetitionException();
			if (this.rechercherNomCompetiteur(nom)) throw new CompetitionException();
			Competiteur compteur = new Competiteur(nom);
			this.competiteurs.add(compteur);
		}
	}

	public ArrayList<Mise> getMise() {
		return mise;
	}

	public void setMise(ArrayList<Mise> mise) {
		this.mise = mise;
	}

	/**
	 * Les mises actuelles pour une competition
	 * @uml.property name="mises"
	 * @uml.associationEnd multiplicity="(0 -1)" ordering="true" inverse="competition:siteParis.Mise"
	 * @uml.association name="contenir"
	 */
	private ArrayList<Mise> mise = new java.util.ArrayList<Mise>();

	/**
	 * Getter of the property <tt>mises</tt>
	 * @return  Returns the mise.
	 * @uml.property  name="mises"
	 */

	/**
	 * Comparer avec une autre competition par le nom
	 * @return true si elles ont le même nom
	 */
	public boolean equal(String nom){
		if (this.nom.equals(nom))  {
			return true;
		} else
			return false;
	}

	/**
	 * Rechercher un competiteur dans la competition
	 * @return true si la competition avait un competiteur dont le nom a le meme valuer
	 */
	public boolean rechercherNomCompetiteur(String nom){
		for (Competiteur c : competiteurs) {
			if (c.equal(nom)) return true;
		}
		return false;
	}


	/**
	 * Valider le nom, les noms des competiteurs et la date cloture pour une competition
	 * @param nom
	 * @param competiteurs
	 * @param dateCloture
	 * @throws CompetitionException levée si le nom de la
	 * compétition ou des compétiteurs sont invalides, si il y a
	 * moins de 2 compétiteurs, si un des competiteurs n'est pas instancié,
	 * si deux compétiteurs ont le même nom, si la date de clôture
	 * n'est pas instanciée ou est dépassée.
	 */
	public static void validiteNomCompeteurDate(String nom, String [] competiteurs, DateFrancaise dateCloture) throws CompetitionException{
		if (nom==null) throw new CompetitionException();
		if (dateCloture == null) throw new CompetitionException();
		if (dateCloture.estDansLePasse()) throw new CompetitionException();
		if (!nom.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
		for (String cnom : competiteurs){
			if (cnom==null) throw new CompetitionException();
			if (!cnom.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
		}
	}
	/**
	 * Constructor
	 * @throws CompetitionException  levée
	 * si le <code>nom</code>  est invalide
	 */
	public Competition(String nom) throws CompetitionException{
		if (nom==null) throw new CompetitionException();
		if (!nom.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
		//instancier le tableau de competiteur
		this.competiteurs = new ArrayList<>();
		this.nom = nom;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	/**
	 * Get la somme des mises actuelles dans la competition
	 * @return la somme des mises
	 */
	public double getMiseSomme() {
		double s = 0;
		for (Mise m : mise) {
			s += m.getJetons();
		}
		return s;
	}
	/**
	 * Get la somme des mises actuelles pour le vainqueur dans la competition
	 * @return la somme des mises
	 */
	public double getMiseSommeVainqueur() {
		double s = 0;
		for (Mise m : mise) {
			if (m.getCompetiteurChoisi().equals(this.vainqueur)) {
				s += m.getJetons();
			}
		}
		return s;
	}

	/**
	 * Rechercher les joueurs qui avaient mise sur le vainqueur de
	 * la competition avec leur mise de jeton
	 * @return le tableau des joueurs qui avaient une bonne mise
	 * @throws JoueurException
	 */
	public ArrayList<JoueurAvecMise> getWinner() throws JoueurException {
		ArrayList<JoueurAvecMise> wins = new ArrayList<>();
		for (Mise m : mise) {
			if (m.getCompetiteurChoisi().equals(this.vainqueur)) {
				Joueur j = m.getJoueur();
				JoueurAvecMise g = new JoueurAvecMise(j.getNom(), j.getPrenom(), j.getPseudo());
				g.setMiseMontant(m.getJetons());
				wins.add(g);
			}
		}
		return wins;
	}
	/**
	 * Rechercher les joueurs qui n'avaient pas mise sur le vainqueur de
	 * la competition avec leur mise de jeton
	 * @return le tableau des joueurs qui avaient une mauvaise mise
	 * @throws JoueurException
	 */
	public ArrayList<JoueurAvecMise> getLosers() throws JoueurException {
		ArrayList<JoueurAvecMise> wins = new ArrayList<>();
		for (Mise m : mise) {
			if (!m.getCompetiteurChoisi().equals(this.vainqueur)) {
				Joueur j = m.getJoueur();
				JoueurAvecMise g = new JoueurAvecMise(j.getNom(), j.getPrenom(), j.getPseudo());
				g.setMiseMontant(m.getJetons());
				wins.add(g);
			}
		}
		return wins;
	}
	/**
	 * Valider le nom pour une competition, et le nom pour un vainqueur
	 * @param competition : le nom de la competition
	 * @param vainqueurEnvisage : le nom du vainqueur
	 * @throws CompetitionException levée si le nom de la competition ou
	 * le nom du vainqueur sont invalides
	 */
	public static void validiteCompetitionVainqueur(String competition, String vainqueurEnvisage) throws CompetitionException{
		if (competition==null) throw new CompetitionException();
		if (!competition.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
		if (vainqueurEnvisage.length() < 2) throw new CompetitionException();
	}

	/**
	 * verifier si la competition contennait le competiteur
	 * @param vainqueurEnvisage : le nom du competiteur
	 * @return true si la competition contennait le competiteur
	 */
	public boolean contient(String vainqueurEnvisage) {
		for (Competiteur c : competiteurs) {
			if (c.getNom().equals(vainqueurEnvisage)) return true;
		}
		return false;
	}

	/**
	 * Valider le nom pour une competition
	 * @param competition : le nom de la competition
	 * @throws CompetitionException levée si le nom de la competition est invalide
	 */
	public static void validiteCompetition(String competition) throws CompetitionException{
		if (competition==null) throw new CompetitionException();
		if (!competition.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();

	}

	/**
	 * ajouter une mises sur la competition
	 * @param joueur : le joueur
	 * @param vainqueurEnvisage : le nom du vainqueur envisage
	 * @param miseEnJetons : la somme de jeton
	 */
	public void addMise(Joueur joueur, String vainqueurEnvisage, long miseEnJetons) {
		// verifier si le joueur a deja mise cette competition
		// si oui, augmenter la somme de jeton mise avec miseEnJetons
		for (Mise m : mise) {
			if (m.getJoueur().equal(joueur.getNom(), joueur.getPrenom(), joueur.getPseudo())) {
				m.setJetons(miseEnJetons + m.getJetons());
				joueur = null;
				break;
			}
		}
		//si le joueur n'a pas mise cette competition
		if (joueur != null) {
			Mise m = new Mise(miseEnJetons, joueur, vainqueurEnvisage);
			mise.add(m);

		}

	}

}
