using UnityEngine;
using System.Collections;

public class SpawnScript : MonoBehaviour {

	public GameObject[] obj;
	//public float spawnMin = 1f;
	//public float spawnMax = 2f;

	public float spawnTime = 4;
	public float spawnTimeMin = 1;
	int temp = 1;
	float timer;

	// Use this for initialization
	void Start () {
		Spawn();
	}

	void Update(){
		timer += Time.deltaTime;

		// Increase amount to spawn every five seconds
		if(timer*temp > 5){
			if(spawnTime > spawnTimeMin)
				spawnTime -= 1;
			timer = 0;
		}
	}

	void Spawn() 
	{
		Instantiate (obj[Random.Range (0, obj.Length)], transform.position, Quaternion.identity);
		Invoke ("Spawn", spawnTime);//Random.Range (spawnMin, spawnMax));

	}
}
