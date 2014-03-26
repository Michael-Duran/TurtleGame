#pragma strict

var jumpSpeed : float = 400;
var dropSpeed : float = 400;
var fallSpeed : float = 1000;
var maxFallSpeed : float = 100;
var maxUpSpeed : float = 400;
var slopeLimit : float = 450;
var swim : boolean;
var retract : boolean;

private var verticalMotion : float;
private var verticalDrop : float;
private var xScale : float;
private var verticalInput : float;
private var jump : boolean;
private var hide : boolean;
private var anim : Animator;
//private var circCollider : CircleCollider2D; // If boxCollider2D is used replace with ...
//   private var boxColl : BoxCollider2D;

//===== Start Function ================================================================================================
// Called Once at the beginning of script Execution
//=====================================================================================================================
function Start () {
	//xScale = transform.localScale.x; // Get correct starting Orientation for player.
	anim = gameObject.GetComponent("Animator"); // Get Animations for character
	//circCollider = GetComponent(CircleCollider2D); // if boxCollider2D is used replace w/... 
	//   boxColl = GetComponent(BoxCollider2D);
}

//===== Update Function ===============================================================================================
// Gets called several times per second.
//=====================================================================================================================
function Update () {
	verticalInput = Input.GetAxisRaw("Vertical"); // Get vertical input,.
	
	// Pass verticalMotion information to the animator, so it knows the specific motion.
	anim.SetFloat("VM", verticalMotion);
	anim.SetFloat("VD", verticalDrop);
}




//===== FixedUpdate Function ==========================================================================================
// Called Once per every frame refresh. Ex: 60Hz monitor would call this 
// function 60 times every second.
//===================================================================================================================== 
function FixedUpdate(){

	// If jump button is detected, set verticalMotion variable to the jumpSpeed
	if((Input.GetMouseButtonDown(0)) || (Input.GetKeyDown(KeyCode.Space))){ 
		verticalMotion = jumpSpeed;
		
	}
       
	if(Input.GetKeyDown(KeyCode.A)){ 
		verticalMotion = -dropSpeed;
		
	}
       
       
		
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
		//rigidbody2D.velocity = Vector2.zero; 

}

