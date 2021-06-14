<?php
header("Access-Control-Allow-Origin: http://localhost:3000");

// Job Automation
class SupportChat {
	public $contents = 'responses';
	public string $msg;

	public function __construct(string $msg) {
		$this->msg = $msg;
	}

	public function __destruct() {
		if (preg_match("/^[a-z0-9]*$/i", $this->contents) !== 1) {
			echo 'NO';
			exit(403);
		} else {
			$f_contents = file(__DIR__ . '\\..\\' . $this->contents . '.txt');
			echo $f_contents[array_rand($f_contents)];
			return $f_contents[array_rand($f_contents)];
		}
	}
}

$msg = unserialize($_GET['msg'] ?? '');
$ban = new SupportChat(strval($msg));

?>