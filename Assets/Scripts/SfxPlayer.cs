using UnityEngine;
using System.Collections;

public class SfxPlayer : MonoBehaviour {
	public AudioSource audioPlayer;

	static SfxPlayer instance;

	// Use this for initialization
	void Start () {
		if (instance == null) {
			instance = this;
		}
	}
	
	void OnDestroy() {
		instance = null;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public static SfxPlayer Instance {
		get { return instance; }
	}
	
	public void PlaySfx (AudioClip sfxClip) {
		audioPlayer.PlayOneShot(sfxClip);
	}
}
