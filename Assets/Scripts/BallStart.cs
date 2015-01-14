using UnityEngine;
using System.Collections;

public class BallStart : MonoBehaviour {
	public Rigidbody2D ballRigidBody;
	public Collider2D ballCollider;
	
	[SerializeField]	AudioClip	hitSound;

	[SerializeField] 	float 	speed;
	[SerializeField]	float	speedIncrease;
						Vector2	currentVelocity;

	// Use this for initialization
	void Start () {
		Vector2 direction = Random.insideUnitCircle.normalized;
		currentVelocity = direction * speed;
		ballRigidBody.velocity = currentVelocity;
	}
	
	// Update is called once per frame
	void Update () {
	}
	
	void OnCollisionEnter2D(Collision2D coll) {
		//Debug.Log("Number of contacts: " + coll.contacts.Length);
		ReflectBall(coll.contacts[0], coll.relativeVelocity);
	}
	
	void ReflectBall (ContactPoint2D contactPoint, Vector2 relativeVelocity) {
		Vector2 reflectionVector = Vector2.zero;
		
		// Increase the ball speed if it hits the paddle
		if (contactPoint.collider.gameObject.tag == "Player") {
			//speed += speedIncrease;
			reflectionVector = (transform.position - contactPoint.collider.gameObject.transform.position ).normalized * speed;
		} else {
			reflectionVector = currentVelocity - 2 * (Vector2.Dot(currentVelocity,contactPoint.normal.normalized)) * contactPoint.normal.normalized;
		}
		
		currentVelocity = reflectionVector;
		ballRigidBody.velocity = currentVelocity;
		
		//SfxPlayer.Instance.PlaySfx(hitSound);
	}
}
