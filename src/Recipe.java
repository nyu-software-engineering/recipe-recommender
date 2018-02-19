import java.util.ArrayList;

public class Recipe {
	public String name;
	private int prepTime; //in minutes
	boolean starred; //true if user favorites it
	
	private ArrayList<Ingredient> ingredients = new ArrayList<Ingredient>();
	private ArrayList<String> directions =  new ArrayList<String>();
	private String directionsText;
	
	private Nutrition nutritionalFacts;
	
	
	
}
