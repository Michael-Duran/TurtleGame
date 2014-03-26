using UnityEngine;
using System.Collections;

public class HUDScript : MonoBehaviour {
	public int scoreSpeed = 1;
	float playerScore = 0;
	// Update is called once per frame

	void Update () 
	{
		playerScore += Time.deltaTime;
	}

	public void IncreaseScore(int amount)
	{
		playerScore += amount;
	}

	void OnDisable()
	{
		PlayerPrefs.SetInt ("Score", (int)(playerScore * scoreSpeed));
	}

	void OnGUI()
	{
		GUI.contentColor = Color.black;
		GUI.Label (new Rect(20, 10, 100, 30), "Score: " + (int)(playerScore * scoreSpeed));
	}
}
