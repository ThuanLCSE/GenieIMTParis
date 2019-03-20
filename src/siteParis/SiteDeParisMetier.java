package siteParis;


import java.util.LinkedList;
import java.util.Collection;
import java.util.ArrayList;


/**
 * 
 * @author Bernard Prou et Julien Mallet
 * <br><br>
 * La classe qui contient toutes les méthodes "Métier" de la gestion du site de paris. 
 * <br><br>
 * Dans toutes les méthodes :
 * <ul>
 * <li>un paramètre de type <code>String</code> est invalide si il n'est pas instancié.</li>
 *  <li>pour la validité d'un password de gestionnaire et d'un password de joueur :
 * <ul>
 * <li>       lettres et chiffres sont les seuls caractères autorisés </li>
 * <li>       il doit avoir une longueur d'au moins 8 caractères </li>
 * </ul></li>       
 * <li>pour la validité d'un pseudo de joueur  :
 * <ul>
 * <li>        lettres et chiffres sont les seuls caractères autorisés  </li>
 * <li>       il doit avoir une longueur d'au moins 4 caractères</li>
 * </ul></li>       
 * <li>pour la validité d'un prénom de joueur et d'un nom de joueur :
 *  <ul>
 *  <li>       lettres et tiret sont les seuls caractères autorisés  </li>
 *  <li>      il  doit avoir une longueur d'au moins 1 caractère </li>
 * </ul></li>
 * <li>pour la validité d'une compétition  :       
 *  <ul>
 *  <li>       lettres, chiffres, point, trait d'union et souligné sont les seuls caractères autorisés </li>
 *  <li>      elle  doit avoir une longueur d'au moins 4 caractères</li>
 * </ul></li>       
 * <li>pour la validité d'un compétiteur  :       
 *  <ul>
 *  <li>       lettres, chiffres, trait d'union et souligné sont les seuls caractères autorisés </li>
 *  <li>      il doit avoir une longueur d'au moins 4 caractères.</li>
 * </ul></li></ul>
 */

public class SiteDeParisMetier {



	/**
	 * constructeur de <code>SiteDeParisMetier</code>. 
	 * 
	 * @param passwordGestionnaire   le password du gestionnaire.   
	 * 
	 * @throws MetierException  levée 
	 * si le <code>passwordGestionnaire</code>  est invalide 
	 */
	public SiteDeParisMetier(String passwordGestionnaire) throws MetierException {
		this.gestionnaire = new Gestionnaire(passwordGestionnaire);
		

	}





	// Les méthodes du gestionnaire (avec mot de passe gestionnaire)



	/**
	 * inscrire un joueur. 
	 * 
	 * @param nom   le nom du joueur 
	 * @param prenom   le prénom du joueur   
	 * @param pseudo   le pseudo du joueur  
	 * @param passwordGestionnaire  le password du gestionnaire du site  
	 * 
	 * @throws MetierException   levée  
	 * si le <code>passwordGestionnaire</code> proposé est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect.
	 * @throws JoueurExistantException   levée si un joueur existe avec les mêmes noms et prénoms ou le même pseudo.
	 * @throws JoueurException levée si <code>nom</code>, <code>prenom</code>, <code>pseudo</code> sont invalides.
	 * 
	 * @return le mot de passe (déterminé par le site) du nouveau joueur inscrit.
	 */
	public String inscrireJoueur(String nom, String prenom, String pseudo, String passwordGestionnaire) throws MetierException, JoueurExistantException, JoueurException {
		return "unPasswordUnique";
	}

	/**
	 * supprimer un joueur. 
	 * 
	 * @param nom   le nom du joueur 
	 * @param prenom   le prénom du joueur   
	 * @param pseudo   le pseudo du joueur  
	 * @param passwordGestionnaire  le password du gestionnaire du site  
	 * 
	 * @throws MetierException
	 * si le <code>passwordGestionnaire</code>  est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect.
	 * @throws JoueurInexistantException   levée si il n'y a pas de joueur  avec le même <code>nom</code>, <code>prenom</code>  et <code>pseudo</code>.
	 * @throws JoueurException levée 
	 * si le joueur a des paris en cours,
	 * si <code>nom</code>, <code>prenom</code>, <code>pseudo</code> sont invalides.
	 * 
	 * @return le nombre de jetons à rembourser  au joueur qui vient d'être désinscrit.
	 * 
	 */
	public long desinscrireJoueur(String nom, String prenom, String pseudo, String passwordGestionnaire) throws MetierException, JoueurInexistantException, JoueurException {
		return 0;
	}



	/**
	 * ajouter une compétition.  
	 * 
	 * @param competition le nom de la compétition
	 * @param dateCloture   la date à partir de laquelle il ne sera plus possible de miser  
	 * @param competiteurs   les noms des différents compétiteurs de la compétition 
	 * @param passwordGestionnaire  le password du gestionnaire du site 
	 * 
	 * @throws MetierException levée si le tableau des
	 * compétiteurs n'est pas instancié, si le
	 * <code>passwordGestionnaire</code> est invalide, si le
	 * <code>passwordGestionnaire</code> est incorrect.
	 * @throws CompetitionExistanteException levée si une compétition existe avec le même nom. 
	 * @throws CompetitionException levée si le nom de la
	 * compétition ou des compétiteurs sont invalides, si il y a
	 * moins de 2 compétiteurs, si un des competiteurs n'est pas instancié,
	 * si deux compétiteurs ont le même nom, si la date de clôture 
	 * n'est pas instanciée ou est dépassée.
	 */
	public void ajouterCompetition(String competition, DateFrancaise dateCloture, String [] competiteurs, String passwordGestionnaire) throws MetierException, CompetitionExistanteException, CompetitionException  {

	}


	/**
	 * solder une compétition vainqueur (compétition avec vainqueur).  
	 * 
	 * Chaque joueur ayant misé sur cette compétition
	 * en choisissant ce compétiteur est crédité d'un nombre de
	 * jetons égal à :
	 * 
	 * (le montant de sa mise * la somme des
	 * jetons misés pour cette compétition) / la somme des jetons
	 * misés sur ce compétiteur.
	 *
	 * Si aucun joueur n'a trouvé le
	 * bon compétiteur, des jetons sont crédités aux joueurs ayant
	 * misé sur cette compétition (conformément au montant de
	 * leurs mises). La compétition est "supprimée" si il ne reste
	 * plus de mises suite à ce solde.
	 * 
	 * @param competition   le nom de la compétition  
	 * @param vainqueur   le nom du vainqueur de la compétition 
	 * @param passwordGestionnaire  le password du gestionnaire du site 
	 * 
	 * @throws MetierException   levée 
	 * si le <code>passwordGestionnaire</code>  est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect.
	 * @throws CompetitionInexistanteException   levée si il n'existe pas de compétition de même nom.
	 * @throws CompetitionException levée 
	 * si le nom de la compétition ou du vainqueur est invalide, 
	 * si il n'existe pas de compétiteur du nom du vainqueur dans la compétition,
	 * si la date de clôture de la compétition est dans le futur.
	 * 
	 */	
	public void solderVainqueur(String competition, String vainqueur, String passwordGestionnaire) throws MetierException,  CompetitionInexistanteException, CompetitionException  {

	}



	/**
	 * créditer le compte en jetons d'un joueur du site de paris.
	 * 
	 * @param nom   le nom du joueur 
	 * @param prenom   le prénom du joueur   
	 * @param pseudo   le pseudo du joueur  
	 * @param sommeEnJetons   la somme en jetons à créditer  
	 * @param passwordGestionnaire  le password du gestionnaire du site  
	 * 
	 * @throws MetierException   levée 
	 * si le <code>passwordGestionnaire</code>  est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect,
	 * si la somme en jetons est négative.
	 * @throws JoueurException levée  
	 * si <code>nom</code>, <code>prenom</code>,  <code>pseudo</code> sont invalides.
	 * @throws JoueurInexistantException   levée si il n'y a pas de joueur  avec les mêmes nom,  prénom et pseudo.
	 */
	public void crediterJoueur(String nom, String prenom, String pseudo, long sommeEnJetons, String passwordGestionnaire) throws MetierException, JoueurException, JoueurInexistantException {

	}


	/**
	 * débiter le compte en jetons d'un joueur du site de paris.
	 * 
	 * @param nom   le nom du joueur 
	 * @param prenom   le prénom du joueur   
	 * @param pseudo   le pseudo du joueur  
	 * @param sommeEnJetons   la somme en jetons à débiter  
	 * @param passwordGestionnaire  le password du gestionnaire du site  
	 * 
	 * @throws MetierException   levée 
	 * si le <code>passwordGestionnaire</code>  est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect,
	 * si la somme en jetons est négative.
	 * @throws JoueurException levée  
	 * si <code>nom</code>, <code>prenom</code>,  <code>pseudo</code> sont invalides 
	 * si le compte en jetons du joueur est insuffisant (il deviendrait négatif).
	 * @throws JoueurInexistantException   levée si il n'y a pas de joueur  avec les mêmes nom,  prénom et pseudo.
	 * 
	 */

	public void debiterJoueur(String nom, String prenom, String pseudo, long sommeEnJetons, String passwordGestionnaire) throws  MetierException, JoueurInexistantException, JoueurException {

	}



	/** 
	 * consulter les  joueurs.
	 * 
	 * @param passwordGestionnaire  le password du gestionnaire du site de paris 

	 * @throws MetierException   levée  
	 * si le <code>passwordGestionnaire</code>  est invalide,
	 * si le <code>passwordGestionnaire</code> est incorrect.
	 * 
	 * @return une liste de liste dont les éléments (de type <code>String</code>) représentent un joueur avec dans l'ordre : 
	 *  <ul>
	 *  <li>       le nom du joueur  </li>
	 *  <li>       le prénom du joueur </li>
	 *  <li>       le pseudo du joueur  </li>
	 *  <li>       son compte en jetons restant disponibles </li>
	 *  <li>       le total de jetons engagés dans ses mises en cours. </li>
	 *  </ul>
	 */
	public LinkedList <LinkedList <String>> consulterJoueurs(String passwordGestionnaire) throws MetierException {
		return new LinkedList <LinkedList <String>>();
	}








	// Les méthodes avec mot de passe utilisateur



	/**
	 * miserVainqueur  (parier sur une compétition, en désignant un vainqueur).
	 * Le compte du joueur est débité du nombre de jetons misés.
	 * 
	 * @param pseudo   le pseudo du joueur  
	 * @param passwordJoueur  le password du joueur  
	 * @param miseEnJetons   la somme en jetons à miser  
	 * @param competition   le nom de la compétition  relative au pari effectué
	 * @param vainqueurEnvisage   le nom du compétiteur  sur lequel le joueur mise comme étant le  vainqueur de la compétition  
	 * 
	 * @throws MetierException levée si la somme en jetons est négative.
	 * @throws JoueurInexistantException levée si il n'y a pas de
	 * joueur avec les mêmes pseudos et password.
	 * @throws CompetitionInexistanteException   levée si il n'existe pas de compétition de même nom. 
	 * @throws CompetitionException levée 
	 * si <code>competition</code> ou <code>vainqueurEnvisage</code> sont invalides,
	 * si il n'existe pas un compétiteur de  nom <code>vainqueurEnvisage</code> dans la compétition,
	 * si la compétition n'est plus ouverte (la date de clôture est dans le passé).
	 * @throws JoueurException   levée 
	 * si <code>pseudo</code> ou <code>password</code> sont invalides, 
	 * si le <code>compteEnJetons</code> du joueur est insuffisant (il deviendrait négatif).
	 */
    public void miserVainqueur(String pseudo, String passwordJoueur, long miseEnJetons, String competition, String vainqueurEnvisage) throws MetierException, JoueurInexistantException, CompetitionInexistanteException, CompetitionException, JoueurException  {

	}


    

	// Les méthodes sans mot de passe


	/**
	 * connaître les compétitions en cours.
	 * 
	 * @return une liste de liste dont les éléments (de type <code>String</code>) représentent une compétition avec dans l'ordre : 
	 *  <ul>
	 *  <li>       le nom de la compétition,  </li>
	 *  <li>       la date de clôture de la compétition. </li>
	 *  </ul>
	 */
	public LinkedList <LinkedList <String>> consulterCompetitions(){
		return new LinkedList <LinkedList <String>>();
	} 

	/**
	 * connaître  la liste des noms des compétiteurs d'une compétition.  
	 * 
	 * @param competition   le nom de la compétition  
	 * 
	 * @throws CompetitionException   levée  
	 * si le nom de la compétition est invalide.
	 * @throws CompetitionInexistanteException   levée si il n'existe pas de compétition de même nom. 
	 * 
	 * @return la liste des compétiteurs de la  compétition.
	 */
	public LinkedList <String> consulterCompetiteurs(String competition) throws CompetitionException, CompetitionInexistanteException{
		return new LinkedList <String> ();
	}

	/**
	 * vérifier la validité du password du gestionnaire.
	 * 
	 * @param passwordGestionnaire   le password du gestionnaire à vérifier
	 * 
	 * @throws MetierException   levée 
	 * si le <code>passwordGestionnaire</code> est invalide.  
	 */
	protected void validitePasswordGestionnaire(String passwordGestionnaire) throws MetierException {
	    if (passwordGestionnaire==null) throw new MetierException();
	    if (!passwordGestionnaire.matches("[0-9A-Za-z]{8,}")) throw new MetierException();
	}

	/** 
	 * @uml.property name="joueurs"
	 * @uml.associationEnd multiplicity="(0 -1)" ordering="true" inverse="siteDeParisMetier:siteParis.Joueur"
	 * @uml.association name="gerer"
	 */
	private ArrayList joueur = new java.util.ArrayList();

	/**
	 * @uml.property  name="gestionnaire"
	 * @uml.associationEnd  multiplicity="(1 1)" inverse="siteDeParisMetier:siteParis.Gestionnaire"
	 * @uml.association  name="gerer"
	 */
	private Gestionnaire gestionnaire;
	/** 
	 * @uml.property name="competitions"
	 * @uml.associationEnd multiplicity="(0 -1)" ordering="true" inverse="siteDeParisMetier:siteParis.Competition"
	 * @uml.association name="contenir"
	 */
	private ArrayList competition = new java.util.ArrayList();

	/**
	 * Getter of the property <tt>joueurs</tt>
	 * @return  Returns the joueur.
	 * @uml.property  name="joueurs"
	 */
	public ArrayList getJoueurs() {
		return joueur;
	}





	/**
	 * Setter of the property <tt>joueurs</tt>
	 * @param joueurs  The joueur to set.
	 * @uml.property  name="joueurs"
	 */
	public void setJoueurs(ArrayList joueurs) {
		joueur = joueurs;
	}



}


