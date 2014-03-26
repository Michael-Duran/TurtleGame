using UnityEngine;
using System.Collections;

public class oscilatingSpawner : MonoBehaviour {

	public float turnAroundSpeed = 2.0f;
	void Update()
	{
		transform.Translate(0, turnAroundSpeed * Time.deltaTime , 0);
	}
}
