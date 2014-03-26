using UnityEngine;
using System.Collections;

public class FishMovement : MonoBehaviour {

	public float fishSpeed = 2.0f;
	 
	void Update()
	{
		transform.Translate(-fishSpeed * Time.deltaTime, 0, 0);
	}
}