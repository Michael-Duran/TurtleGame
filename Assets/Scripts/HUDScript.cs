using UnityEngine;
using System.Collections;

public class HUDScript : MonoBehaviour {
	public int scoreSpeed = 1;
	float playerScore = 0;
	public Font fontNormal;
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
		int someInt = 48;
		GUIStyle myStyle = new GUIStyle(); 
		fontNormal = Resources.Load("Antimony Funk", typeof(Font)) as Font; 
		myStyle.font = fontNormal; 
		myStyle.fontSize = someInt;
		myStyle.alignment=TextAnchor.UpperLeft;
		//GUI.contentColor = Color.black;
		GUI.Label (new Rect(20, 10, 100, 30), "Score: " + (int)(playerScore * scoreSpeed), myStyle);
	}
}
