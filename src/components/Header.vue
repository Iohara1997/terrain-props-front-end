<template>
    <header>

        <nav>
            <div id="menu">
                <div id="logo-site">
                    <a href="/"><img alt="Logo do site" id="logo" src="https://cdn.discordapp.com/attachments/725174617844613160/881657807621996564/44536.png">SONICO</a>
                </div>
                <div id="menu-items">
                    <ul>
                        <li><a href="/">Início</a></li>
                        <li><a href="/">Sobre</a></li>
                        <li><a href="/">Contato</a></li>
                    </ul>
                </div>
                <div id="menu-login">
                    <a href="/">Registre-se</a>
                    <div id="login-item">
                        <a href="/">Entrar</a>
                    </div>
                </div>
            </div>
        </nav>

    </header>
</template>

<script>
export default{
    name:'Header'
}
</script>

<style scoped>

    header{
        background-color: var(--color-background-nav);
        height: 100%;
        width: 100%;
    }

    #logo{
        margin-left: 15px;
        height: 55px;
        width: 55px;
    }

    #logo-site a{
        display: flex;
        align-items: center;
        font-size: 30px;
    }

    #menu{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }

    ul{
        display: flex;
        direction: column;
    }

    ul li{
        border: 2px solid var(--color-background-nav);
        padding: 5px;
        transition: transform 0.6s ease-in-out;  
        transition: box-shadow 0.2s ease-in-out;
        list-style-type: none;
        margin: 15px;
    }

    ul li:hover{
        border: 1px solid var(--color-background-home);
        transform: scale(1.5); 
        box-shadow: 0 5px 15px rgba(0,0,0,0.6);
    }

    #menu-login{
        display: flex;
        align-items: center;
    }

    #login-item{
        padding: 12px;
        margin-left: 15px;
        margin-right: 15px;
        background-color: var(--color-background);
        border-radius: 5px;
    }

    #login-item a{
        color: rgb(28, 97, 28);
    }
    #menu-login a:hover{
        text-decoration: underline;
    }

</style>
