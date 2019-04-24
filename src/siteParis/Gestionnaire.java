package siteParis;


public class Gestionnaire {

	/**
	 * Password de gestionnaire, min length : 6 characters, contient au moins un chiffre
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
		 */
		public void validitePasswordGestionnaire(String password)	throws MetierException {
			if (!this.password.equals(password)) throw new MetierException();
			return;
		}

			/**
			 */
			public Gestionnaire(String password) throws MetierException{
				if (password == null) throw new MetierException();
				if (password.length() < 8 ) throw new MetierException();
				if (password.contains(" ")) throw new MetierException();
				if (password.contains("-")) throw new MetierException();
				this.password = password;
			}

}
