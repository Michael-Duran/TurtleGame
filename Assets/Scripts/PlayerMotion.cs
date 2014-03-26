using UnityEngine;
using System.Collections;

public class PlayerMotion : MonoBehaviour {
	
	public int jumpSpeed = 400;
	public int quickDrop = 600; 
	private float timeAtButtonPress = 0f;
	private float verticalMotion;
	//private Animator anim;

	void Update () {
		//verticalInput = Input.GetAxisRaw("Vertical"); // Get vertical input,.
		//verticalMotion = rigidbody2D.velocity;

		// Starts Timer for when the button is pressed down. 
		// Used to determine short or long touches
		if(Input.GetMouseButtonDown(0)){
			timeAtButtonPress = Time.time;
		}

		// Short touch
		if (Input.GetMouseButtonUp(0) && (Time.time - timeAtButtonPress) < 0.2){ 
			// Applies vertical movement to our character
			rigidbody2D.velocity = new Vector2 (0, 0);
			rigidbody2D.AddForce (Vector2.up * jumpSpeed);

			// Pass verticalMotion information to the animator, so it knows the specific motion.
			//anim.SetFloat("VM", jumpSpeed);
		}

		// Long touch
		if (Input.GetMouseButton (0) && (Time.time-timeAtButtonPress) > 0.2){
			
			rigidbody2D.velocity = new Vector2 (0, 0);
			rigidbody2D.AddForce (Vector2.up * -quickDrop);

			// Pass verticalMotion information to the animator, so it knows the specific motion.
			//anim.SetFloat("VM", -quickDrop);
		}

		// When Long touch is released
		if(Input.GetMouseButtonUp(0) && (Time.time - timeAtButtonPress) > 0.2){
			rigidbody2D.velocity = new Vector2 (0, 0);
		}
	}
}
