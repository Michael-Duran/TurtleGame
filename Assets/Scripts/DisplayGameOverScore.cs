using UnityEngine;
using System.Collections;

public class DisplayGameOverScore : MonoBehaviour {

	int score = 0;
	public Font fontNormal;
	// Use this for initialization
	void Start () 
	{
		score = PlayerPrefs.GetInt("Score");
	}

	void OnGUI()
	{
		int someInt = 72;
		GUIStyle myStyle = new GUIStyle(); 
		fontNormal = Resources.Load("Antimony Funk", typeof(Font)) as Font; 
		myStyle.font = fontNormal; 
		myStyle.fontSize = someInt;
		myStyle.alignment=TextAnchor.MiddleCenter; 
		GUI.Label(new Rect(Screen.width/2 -40,Screen.height-Screen.height+400,80,80), "GAME OVER\n\nScore: " + score,myStyle);


		//int someInt = 72;
		//GUI.skin.label.fontSize = someInt;
		//GUI.Label (new Rect(Screen.width / 2 - 60, 150, 150, 200), "GAME OVER\n\n  Score: " + score, myStyle);
		//GUI.Label (new Rect(Screen.width / 2, 300, 80, 30), "Score: " + score);
		//GUI.skin.button.fontSize = someInt;
		if(GUI.Button (new Rect(Screen.width / 2 - 40, Screen.height-Screen.height+800, 80, 80), "Retry?", myStyle))
		{
			Application.LoadLevel(0);
		}
	}
}
