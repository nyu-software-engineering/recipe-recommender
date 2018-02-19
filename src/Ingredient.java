
public class Ingredient {
	private int id;
	private String name;
	private int quantity; //units?
	
	public Ingredient(String name, int quantity){
		this.name = name;
		this.quantity = quantity;
	}
	
	public void subtractQuantity(int q){
		quantity-= q;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}