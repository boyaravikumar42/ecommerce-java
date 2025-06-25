class Lamda
{
    public static void main(String[] args) {
        Vehicle thar =new Car() {
            public void drive(int id)
            {
                System.out.println("driving thar car ");
            }
        };
              thar.drive(67);
              Vehicle tata = (id)->{System.out.println("driving tata car"+id);};
              tata.drive(60);
              System.out.println(thar);  
              
    }
}
@FunctionalInterface
interface Vehicle
{
    public void drive(int id);
}
class Car implements Vehicle{ 
    public String name;
    @Override
    public void drive(int id) {
        System.out.println("normal implemetation ");
        // TODO Auto-generated method stub
    }

}