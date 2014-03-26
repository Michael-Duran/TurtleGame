#pragma strict
var anim : Animator;

function Start () {
	anim = GetComponent("Animator");

}

function Update () {
	if(Input.GetKeyDown(KeyCode.UpArrow)){
		anim.SetFloat("Paddle", 1.0);
	} else if(Input.GetKeyUp(KeyCode.UpArrow)){
		anim.SetFloat("Paddle",0.0);
	}
}