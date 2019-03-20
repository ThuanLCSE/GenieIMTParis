package siteParis;

import java.util.Date;
import java.util.Collection;
import java.util.ArrayList;


public class Competition {

	public static final String EN_ATTENTE = "en attente / not soldee yet";
	public static final String SOLDEE = "soldée";
	/**
	 * le nom de la competition, min length : 3 characters
	 * @uml.property  name="nom"
	 */
	private String nom = "";
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
		 * @uml.property  name="competiteurs"
		 * @uml.associationEnd  multiplicity="(0 -1)" ordering="true" inverse="competition:siteParis.Competiteur"
		 * @uml.association  name="contenir"
		 */
		private ArrayList<Competiteur> competiteurs = new java.util.ArrayList<Competiteur>();
		public ArrayList<Competiteur> getCompetiteurs() {
			return competiteurs;
		}

		public void setCompetiteurs(String[] competiteurs) throws CompetitionException, MetierException {
			if (competiteurs == null) throw new MetierException();
			if (competiteurs.length < 2) throw new CompetitionException();
			for (String nom : competiteurs) {
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
			 */
			public boolean equal(String nom){
				if (this.nom.equals(nom))  {
					return true;
				} else
				return false;	
			}

				
				/**
				 * rechercher les joueurs qui ont mis les jetons sur le vainqueur
				 * 
				 */
				public ArrayList rechercherJoueursGagnes(){
					return null;
				}

					
					/**
					 */
					public boolean rechercherNomCompetiteur(String nom){
						for (Competiteur c : competiteurs) {
							if (c.equal(nom)) return true;
						}
						return false;	
					}

						
						/**
						 */
						public Competition(String nom) throws CompetitionException{
							if (nom==null) throw new CompetitionException();
						    if (!nom.matches("[A-Za-z0-9]{4,}")) throw new CompetitionException();
							this.nom = nom;
						}

							
								
								
								public boolean rechercherCompetiteur(String nomCompetiteur){
								
																return false;
															 }

								public String getStatut() {
									return statut;
								}

								public void setStatut(String statut) {
									this.statut = statut;
								}

}
