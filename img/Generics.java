import java.util.Arrays;

public class Generics {
    public static void main(String[] args) {
        Box box =new Box<>();
        box.add(Integer.valueOf(23));
        box.add(Double.valueOf("343.45"));
        box.add(Byte.valueOf("43"));
        System.out.println(box.get(2));
        //System.out.println(box);
        
    }
}
class Box<T extends Number>
{
    int i=0;
   Object arr[];
    Box()
    {
        arr=new Object[10];
    }
    public void add(T ele)
    {
        arr[i%10]=(T)ele;
        i++;
    }
    public T get(int index)
    {
        return (T)arr[index];
    }
    @Override
    public String toString() {
        return "Box [i=" + i + ", arr=" + Arrays.toString(arr) + "]";
    }
    
}
class Almond
{
    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Almond [name=" + name + "]";
    }

    public Almond(String name) {
        this.name = name;
    }

    public Almond() {
    }



}
class Cashew
{
    String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Cashew [name=" + name + "]";
    }

    public Cashew(String name) {
        this.name = name;
    }

    public Cashew() {
    }
}
