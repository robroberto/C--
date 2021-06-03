#include <emscripten.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
int addPrimeNumbers()
{
  int i, Number, count, Sum = 0; 
  
  for(Number = 1; Number <= 1000000; Number++)
  {
    count = 0;
    for (i = 2; i <= Number/2; i++)
    {
  	if(Number%i == 0)
  	{
  	   count++;
  	   break;
	}
    }
    if(count == 0 && Number != 1 )
    {
	Sum = Sum + Number;
    }  
  }
  return Sum;
}
