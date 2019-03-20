package siteParis;

import java.util.Date;
import java.util.Collection;
import java.util.ArrayList;


public class Competition {

	/**
	 * le nom de la competition, min length : 3 characters
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
	public void setVainqueur(String vainqueur) {
		this.vainqueur = vainqueur;
	}

	/**
	 * la date de cloture de la competition
	 * @uml.property  name="dateCloture"
	 */
	private Date dateCloture = new java.util.Date();

	/**
	 * Getter of the property <tt>dateCloture</tt>
	 * @return  Returns the dateCloture.
	 * @uml.property  name="dateCloture"
	 */
	public Date getDateCloture() {
		return dateCloture;
	}

	/**
	 * Setter of the property <tt>dateCloture</tt>
	 * @param dateCloture  The dateCloture to set.
	 * @uml.property  name="dateCloture"
	 */
	public void setDateCloture(Date dateCloture) {
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
		private ArrayList competiteurs = new java.util.ArrayList();
		/** 
		 * @uml.property name="mises"
		 * @uml.associationEnd multiplicity="(0 -1)" ordering="true" inverse="competition:siteParis.Mise"
		 * @uml.association name="contenir"
		 */
		private ArrayList mise = new java.util.ArrayList();

		/**
		 * Getter of the property <tt>mises</tt>
		 * @return  Returns the mise.
		 * @uml.property  name="mises"
		 */
		public ArrayList getMises() {
			return mise;
		}

		/**
		 * Setter of the property <tt>mises</tt>
		 * @param mises  The mise to set.
		 * @uml.property  name="mises"
		 */
		public void setMises(ArrayList mises) {
			mise = mises;
		}

			
			/**
			 */
			public boolean equal(String nom){
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
					public boolean verifierNomCompetiteur(ArrayList competiteurs){
						return false;	
					}

						
						/**
						 */
						public Competition(String nom){
						}

							
								
								
								public boolean rechercherCompetiteur(String nomCompetiteur){
								
																return false;
															 }

}
