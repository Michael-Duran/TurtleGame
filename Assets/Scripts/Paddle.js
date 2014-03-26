#pragma strict
var moveSpeed : float = 8;
var jumpSpeed : float = 25;
var fallSpeed : float = 64;
var maxFallSpeed : float = 60;
var maxUpSpeed : float = 25;
var slopeLimit : float = 45;
var dashSpeed : float = 120;
var fly : boolean;
 
private var vm : float;
var onGround : boolean;
private var xScale : float;
private var h : float;
private var v : float;
private var jump : boolean;
private var anim : Animator;
private var circCollider : CircleCollider2D; //If boxCollider2D is used replace w/ ... private var boxColl : BoxCollider2D;
 
function Start () {
        xScale = transform.localScale.x; //Get correct starting Orientation for player.
        anim = gameObject.GetComponent("Animator"); //Get Animations for character
        circCollider = GetComponent(CircleCollider2D); //if boxCollider2D is used replace w/... boxColl = GetComponent(BoxCollider2D);
}
 
function Update () {
        h = Input.GetAxisRaw("Horizontal"); //get horizontal input
        v = Input.GetAxisRaw("Vertical"); //get vertical input
        jump = Input.GetKey(KeyCode.Space); //get jump input
}
 
function FixedUpdate(){
        if(onGround && jump){ //Are we grounded can we jump?
                vm = jumpSpeed;
        }
       
        var moveH : float = h * moveSpeed * Time.deltaTime; //Smooth horizontal movement
        //Flip character orientation
        if(h < 0){
                transform.localScale.x = -xScale;
        } else if(h > 0){
                transform.localScale.x = xScale;
        }
       
        anim.SetFloat("VM", vm); //Animate VM parameter
        anim.SetBool("Grounded", onGround); //Animate Grounded parameter
        rigidbody2D.AddForce(Vector2.right * moveH); //Apply horizontal movement
        rigidbody2D.AddForce(Vector2.up * vm); //Apply vertical movement
       
        if(fly){ //Can we fly?
                if(v > 0){
                        //Fly like a bird!!!
                        vm += v * Time.deltaTime * 20;
                } else {
                        //Uh oh it's gravity
                        vm -= fallSpeed * Time.deltaTime;
                }
        } else {
                //Gravity ... ouch!
                vm -= fallSpeed * Time.deltaTime;
        }
       
        vm = Mathf.Clamp(vm, -maxFallSpeed, maxUpSpeed); //Clamp vertical speeds
        rigidbody2D.velocity = Vector2.zero; //Stop movement if there is no input
        onGround = false; //Clear out grounding check
}
 
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
                if(vm <= 0 && contact.point.y <= transform.position.y - circCollider.radius && Vector2.Angle(Vector2.up, contact.normal) <= slopeLimit){
                        onGround = true;
                        vm = Mathf.Max(0, vm);
                }
        }
}