<?php
#function conectar(){

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bd_nomina";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("La conexión falló: " . $conn->connect_error);
}
#echo "Conexión exitosa";

/*class Database {
    private $connections = [];

    public function __construct($configs) {
        foreach ($configs as $key => $config) {
            $this->connections[$key] = new mysqli($config['host'], $config['username'], $config['password'], $config['database']);

            if ($this->connections[$key]->connect_error) {
                die("Connection failed: " . $this->connections[$key]->connect_error);
            }
        }
    }

    public function getConnection($name) {
        if (isset($this->connections[$name])) {
            return $this->connections[$name];
        } else {
            die("No connection found with name: $name");
        }
    }

    public function __destruct() {
        foreach ($this->connections as $connection) {
            $connection->close();
        }
    }
}

// Configuraciones de las bases de datos
$configs = [
    'db1' => [
        'host' => 'localhost',
        'username' => 'root',
        'password' => '',
        'database' => 'bd_nomina'
    ],
    'db2' => [
        'host' => 'localhost',
        'username' => 'root',
        'password' => '',
        'database' => 'bd_cobranzas'
    ]
];

$db = new Database($configs);
*/
return $conn;
#}
?>