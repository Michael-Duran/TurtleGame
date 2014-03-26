#pragma strict

var jumpSpeed : float = 25;
var dropSpeed : float = 60;
var fallSpeed : float = 64;
var maxFallSpeed : float = 60;
var maxUpSpeed : float = 25;
var slopeLimit : float = 45;
var swim : boolean;
var retract : boolean;

private var verticalMotion : float;
private var verticalDrop : float;
private var xScale : float;
private var verticalInput : float;
private var jump : boolean;
private var hide : boolean;
private var anim : Animator;
private var circCollider : CircleCollider2D; // If boxCollider2D is used replace with ...
//   private var boxColl : BoxCollider2D;

//===== Start Function ================================================================================================
// Called Once at the beginning of script Execution
//=====================================================================================================================
function Start () {
	xScale = transform.localScale.x; // Get correct starting Orientation for player.
	anim = gameObject.GetComponent("Animator"); // Get Animations for character
	circCollider = GetComponent(CircleCollider2D); // if boxCollider2D is used replace w/... 
	//   boxColl = GetComponent(BoxCollider2D);
}

//===== Update Function ===============================================================================================
// Gets called several times per second.
//=====================================================================================================================
function Update () {
	verticalInput = Input.GetAxisRaw("Vertical"); // Get vertical input,.
	//jump = Input.GetKey(KeyCode.Space); // Get jump input, Which is currently 'space'
	//hide = Input.GetKey(KeyCode.DownArrow); // Get hide input, Which is currently 'down'

	jump = Input.GetMouseButtonUp(0); // Get jump input, Which is currently 'space'
	//hide = Input.GetMouseButton(0); // Get hide input, Which is currently 'down'
}




//===== FixedUpdate Function ==========================================================================================
// Called Once per every frame refresh. Ex: 60Hz monitor would call this 
// function 60 times every second.
//===================================================================================================================== 
function FixedUpdate(){

	// If jump button is detected, set verticalMotion variable to the jumpSpeed
	if(jump){ 
		verticalMotion = jumpSpeed;
	}
       
	if(hide){ 
		verticalMotion = -dropSpeed;
	}
       
       
	// Pass verticalMotion information to the animator, so it knows the specific motion.
		anim.SetFloat("VM", verticalMotion);
       
	// Pass verticalDrop information to the animator, so it knows the specific motion.
		anim.SetFloat("VD", verticalDrop);

	// Applies vertical movement to our character
		rigidbody2D.AddForce(Vector2.up * verticalMotion);
       
	// Applies vertical movement to our character
		rigidbody2D.AddForce(-Vector2.up * verticalDrop); 
       
	// Swim will probably always be set to true, but we can set it to false if needed.
		if(swim){

		// If the character is headed in an upward motion (Greater than Zero)...
			if(verticalInput > 0){
				// Adjust Vertical motion based on input, time, and constant arbitrary factor
				verticalMotion += verticalInput * Time.deltaTime * 20;
			}
           

		// If the character is headed in an downward motion (less than or equal to Zero)...
			else{
				// Adjust Vertical motion based on fallspeed and time
				verticalMotion -= fallSpeed * Time.deltaTime;
			}
		} 
       

       
       
	// When swim is set to false (never for now), the character will just move downward aka sink. 
		else{
			verticalMotion -= fallSpeed * Time.deltaTime;
		}
                     
	// Clamp function does not allow the vertical motion to exceed the limit defined by maxFallSpeed and 
	// maxUpSpeed. If these numbers were not 'clamped' both upward and downward force would continually
	// rise. 
		verticalMotion = Mathf.Clamp(verticalMotion, -maxFallSpeed, maxUpSpeed); 
		verticalDrop = Mathf.Clamp(verticalDrop, -maxFallSpeed, maxUpSpeed); 

	//Stop movement if there is no input
		rigidbody2D.velocity = Vector2.zero; 

}


// Collision Detection:
//   - Not exactly sure how all this works. Will fill in comments later.
function OnCollisionEnter2D(c : Collision2D){
	CheckCollision(c);
}

function OnCollisionStay2D(c : Collision2D){
	CheckCollision(c);
}

function CheckCollision(c : Collision2D){
	for(var contact in c.contacts){
		//Check for floor hit
		//If boxCollider2D is used replace circCollider.radius w/ (boxCollider2D.size.y/2)
			if(verticalMotion <= 0 && contact.point.y <= transform.position.y - circCollider.radius && Vector2.Angle(Vector2.up, contact.normal) <= slopeLimit){
				//onGround = true;
					verticalMotion = Mathf.Max(0, verticalMotion);
			}

	}
}

