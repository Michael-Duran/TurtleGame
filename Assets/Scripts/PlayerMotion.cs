using UnityEngine;
using System.Collections;

public class PlayerMotion : MonoBehaviour {
	
	public int jumpSpeed = 400;
	public int quickDrop = 400; 
	
	
	private float verticalMotion;
	//private Animator anim;
	
	
	void Start(){
		//anim = gameObject.GetComponent(Animator anim); // Get Animations for character
		// Update is called once per frame
	}
	
	void Update () {
		
		//verticalInput = Input.GetAxisRaw("Vertical"); // Get vertical input,.
		
		//verticalMotion = rigidbody2D.velocity;
		
		;
		
		
		
		
		if (Input.GetKeyDown (KeyCode.Space)) {
			// Applies vertical movement to our character
			rigidbody2D.velocity = new Vector2 (0, 0);
			rigidbody2D.AddForce (Vector2.up * jumpSpeed);
			// Pass verticalMotion information to the animator, so it knows the specific motion.
			//anim.SetFloat("VM", jumpSpeed);
		}
		if (Input.GetKey (KeyCode.DownArrow)) {
			rigidbody2D.velocity = new Vector2 (0, 0);
			rigidbody2D.AddForce (Vector2.up * -quickDrop);
			// Pass verticalMotion information to the animator, so it knows the specific motion.
			//anim.SetFloat("VM", -quickDrop);
		}
		if (Input.GetKeyUp (KeyCode.DownArrow)) {
			rigidbody2D.velocity = new Vector2 (0, 0);
		}
	}
}
