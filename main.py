from secgemmaster import secgemmaster

// fais une fonction qui lit les messages secgem et les affiche
def read_messages():
    # On crée un objet de la classe secgemmaster
    secgem = secgemmaster()
    # On ouvre la connexion
    secgem.open()
    # On lit les messages
    messages = secgem.read_messages()
    # On ferme la connexion
    secgem.close()
    # On affiche les messages
    for message in messages:
        print(message)


