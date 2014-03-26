using UnityEngine;
using System.Collections;

public class SwimUp : MonoBehaviour 
{
	Vector3 velocity = Vector3.zero;
	public float paddleSpeed = 100f;
	bool didPaddle = false;
	Animator animator;

	void Start () {
		animator =  transform.GetComponentInChildren<Animator>();
	}
	
	// Do Graphic & Input updates here
	void Update () 
	{

		if(Input.GetMouseButtonDown(0) || Input.GetKeyDown (KeyCode.Space))
		{
			didPaddle = true;
			animator.SetTrigger ("DoPaddle");//, verticalMotion);
		}
	}

	// Do physics engine updates here
	void FixedUpdate()
	{
		if(didPaddle)
		{
			rigidbody2D.AddForce(Vector2.up * paddleSpeed);
			didPaddle = false;
		}
	}

}
