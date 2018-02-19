import java.util.ArrayList;
import java.util.HashMap;

public class Pantry {
    
    int id;
    ArrayList<Ingredient> ingredients = new ArrayList<Ingredient>();
    
    /**
     * @key ingredient object
     * @value user checks off that they have it when they first make an account
     */
    HashMap<Ingredient, Boolean> baseIngredients = new HashMap<Ingredient, Boolean>();
    
    public void addIngredient(Ingredient ingredient){
        if(baseIngredients.containsKey(ingredient)){
            baseIngredients.put(ingredient, true);
        }
        ingredients.add(ingredient);
    }
    public void outputIngredients(){
        System.out.println("Pantry contains the following ingredients: ");
        for(Ingredient i: ingredients){
            System.out.println(i);
        }
    }
}
