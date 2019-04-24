package siteParis;

public class JoueurAvecMise extends Joueur {
	private double miseMontant;
	public JoueurAvecMise(String nom, String prenom, String pseudo) throws JoueurException {
		super(nom, prenom, pseudo);
	}
	public double getMiseMontant() {
		return miseMontant;
	}
	public void setMiseMontant(double miseMontant) {
		this.miseMontant = miseMontant;
	}
}
