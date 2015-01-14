﻿using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour {

	[SerializeField] KeyCode	restartKey;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.Escape)) {
			Application.Quit();
		}
		
		if (Input.GetKey(restartKey)) {
			Application.LoadLevel(0);
		}
	}
}
