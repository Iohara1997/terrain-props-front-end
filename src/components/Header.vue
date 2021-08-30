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
        font-size: 25px;
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
        list-style-type: none;
        margin: 15px;
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
        color: var(--color-background-nav);
    }

</style>
