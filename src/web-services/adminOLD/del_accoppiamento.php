<?php

require_once '../config/connect_local.php';
require_once '../config/post_data.php';

$id_partita = mysqli_real_escape_string($con, trim($dati->id_partita)); 

$sql = "DELETE c,r FROM calendarioNEW c ";
$sql .="JOIN risultati r ON r.calendario_id = c.id_calendario ";
$sql .="WHERE id_calendario = {$id_partita} ";


if(mysqli_query($con, $sql))
{
	http_response_code(204);
}
else
{

	errorMessage('query errata: del accoppiamento' . $sql);
}

?>