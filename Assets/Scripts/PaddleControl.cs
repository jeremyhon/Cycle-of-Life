using UnityEngine;
using System.Collections;

enum PLAYER {
	PLAYER1,
	PLAYER2
};

public class PaddleControl : MonoBehaviour {
	[SerializeField] PLAYER playerType;
	[SerializeField] float paddleSpeed;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		switch(playerType) {
			case PLAYER.PLAYER1:
				if (Input.GetKey(KeyCode.UpArrow)) {
					transform.position += new Vector3(0, paddleSpeed) * Time.deltaTime;
				} else if (Input.GetKey(KeyCode.DownArrow)) {
					transform.position += new Vector3(0, -paddleSpeed) * Time.deltaTime;
				}
				break;
				
			case PLAYER.PLAYER2:
				if (Input.GetKey(KeyCode.W)) {
					transform.position += new Vector3(0, paddleSpeed) * Time.deltaTime;
				} else if (Input.GetKey(KeyCode.S)) {
					transform.position += new Vector3(0, -paddleSpeed) * Time.deltaTime;
				}
				break;
		}
	}
}
