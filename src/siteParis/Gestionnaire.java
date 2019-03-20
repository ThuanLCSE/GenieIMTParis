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
		public void validitePasszordGestionnaire()	throws MetierException {
		}

			
			/**
			 */
			public Gestionnaire(String password){
				this.password = password;
			}

}
