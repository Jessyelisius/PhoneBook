// action="/school/forget" method="post" enctype="application/x-www-form-urlencoded" 
// onsubmit="send(event, this,'msgforget','/login',true, 'Password Has been reset')"


function send(e,form,ouput,success, Alerter, Alerttext, prompter) {
    ApiIntegration(form,ouput,success,Alerter,Alerttext, prompter)
    e.preventDefault();
  }

  async function ApiIntegration(form, output, success,Alerter, Alerttext,prompter) {
    let msgg= document.getElementById(output)

    
    const userConfirmed = prompter==true?window.confirm('This could cause a financial crises and may either cost you or profit you bcose transaction and other things might have been performed already. \n Do you want to continue? Click OK to continue, or Cancel to stop.'):true
    if (userConfirmed) {
        try {
            Loader.open()
            console.log(form.enctpye);
            let SendData=await axios({url:form.action, method:'post', headers:{
                Accept:'application/json',
                'Content-Type':`${form.enctype}`
            }, data:new FormData(form)});
            
            let data= SendData.data

            Alerter?alert(Alerttext):null

            
            window.location.pathname=success


        Loader.close()
        } catch (error) {
            console.log(error);
            msgg.innerHTML=error?.response?.data?error.response.data.Message:"Connection error"
        } finally{
            Loader.close()

        }
    } else {
        alert('You clicked Cancel. Action canceled.');
    }
  }