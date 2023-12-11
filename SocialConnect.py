import pickle
from graphClass import Graph
import matplotlib.pyplot as plt
import networkx as nx
import copy
from matplotlib.lines import Line2D
import math


# Classe Social Connect serve para comunicação do servidor com a classe. 

class SocialConnect:

    def __init__(self):

        self.G = None

    def fromPkl(self):
        """
        Carrega o Grafo se este já estiver criado, usando a biblioteca pickle, se não inicia um novo grafo e o salva, criando o arquivo binário, armazenando dessa forma o objeto utilizado
        """
        try:

            with open("files/graph.pkl", 'rb') as file:
                self.G = pickle.load(file)
        except:
            self.G = Graph()
            self.saveGraph()

     # Função que salva o grafo no arquivo
    def saveGraph(self):

        with open('files/graph.pkl', 'wb') as file:
            pickle.dump(self.G, file)

    # Função que retorna todos os vertices do grafo
    def getUsers(self): return self.G.getVertices()

    # Função que retorna o vertice do usuário passado como parâmetro
    def getUser(self, userName): return self.G.getVertex(userName)

    # Função que cria um novo usuário, ou seja um novo vertice no grafo
    def createAccount(self, userName, infos):

        if self.getUser(userName) != None:
            return "Usuário já Cadastrado"

        # Como o vertice possui chave e valor o userName é usado como chave, enquanto as informações são passadas como valor
        self.G.addVertex(userName, infos)
        self.saveGraph()
    # Atualiza o usuário, ou seja o vertice no grafo

    def updateAccount(self, userName, infos):

        if self.getUser(userName):
            UserToEdit = self.getUser(userName)
            UserToEdit.value = infos
            self.saveGraph()
            return True
        else:
            return False

    """
    Busca esperta, ou seja essa busca retorna somente itens relacionados através de busca em largura, itens não relacionados n
    ao serão retornados
    """

    def Search(self, userName, key, value):
        """
        Busca por amplitude e após adiciona os faltantes na lista
        """
        listVertices = (list(self.G.vertices.keys()))
        listVertices.remove(userName)

        if key == "userName":
            matches = self.G.BFS(
                userName, True, lambda v: value in v.key)
        else:
            matches = self.G.BFS(userName, True, lambda v: key in v.value["data"]["public"].keys(
            ) and value in v.value["data"]["public"][key])

        for entity in matches:
            try:
                connections = self.getConnection(userName, entity)
                entity["connections"] = connections
            except:
                None

        for x in matches:
            if x["userName"] in listVertices:
                listVertices.remove(x["userName"])

        if listVertices:
            return matches + self.dumbSearch(key, value, listVertices)
        else:
            return matches

    def dumbSearch(self, key, value, list):
        """
        Busca Burra, ou seja  retorna todos os itens do grafo, relacionado com os valores passados
        """
        matches = []
        for v in list:
            print(v)
            v = self.getUser(v)
            if key == "userName" and value in v.key:
                copy = v.copy()
                copy["connections"] = None
                matches.append(copy)

            elif key in v.value["data"]["public"].keys() and value in v.value["data"]["public"][key]:
                copy = v.copy()
                copy["connections"] = None
                matches.append(copy)
        return matches

    # Função que retorna a relação entre 2 usuários
    def getConnection(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        return self.G.getEdgeWeight(user1.key, user2.key)
        self.saveGraph()

    # Função que adiciona  a relação entre dois usuários como amigos
    def addFriendship(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        self.G.addEdge(user1.key, user2.key, weight="Friend")
        self.G.addEdge(user2.key, user1.key, weight="Friend")
        self.saveGraph()
    # Função que adiciona  a relação entre dois usuários como conhecidos

    def addAcquaintance(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        self.G.addEdge(user1.key, user2.key, weight="Acquaintance")
        self.saveGraph()

    # Função que adiciona  a relação entre dois usuários como Família
    def addFamily(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        self.G.addEdge(user1.key, user2.key, weight="Family")
        self.G.addEdge(user2.key, user1.key, weight="Family")
        self.saveGraph()

    # Função que adiciona a relação entre dois usuários como Cliente
    def addClient(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        self.G.addEdge(user1.key, user2.key, weight="Client")
        self.saveGraph()

    # Função que remove relação entre dois usuários
    def removeRelation(self, userName1, userName2):

        user1 = self.getUser(userName1)
        user2 = self.getUser(userName2)
        self.G.removeEdge(user1.key, user2.key)
        self.G.removeEdge(user2.key, user1.key)
        self.saveGraph()

    # Função que retorna todas as relações de um usuário
    def getAllConnections(self, userName):
        user = self.getUser(userName)
        connections = []
        for x in user.adjacent:
            userToSend = self.getUser(x).copy()
            connections.append(
                [userToSend, self.getConnection(user.key, x)])
        return connections

    def subGraph(self, user, levels):
        """
        Create subgraph centered in user that extends to a certain level of adjacent vertices
        """
        newG = copy.deepcopy(self.G)
        vs = []
        level_vs = [user]
        pos = {user.key: [0, 0]}
        for i in range(levels):
            next_vs = []
            for vertex in level_vs:
                next_vs += [i[0] for i in vertex.adjacent.values()]
            vs += level_vs
            if not next_vs:
                break
            level_vs = next_vs
            for i in range(len(vs)):
                if i == 0:
                    continue
                else:
                    x = round(math.cos((2 * math.pi * i) / (len(vs)-1)), 2)
                    y = round(math.sin((2 * math.pi * i) / (len(vs)-1)), 2)
                    nameKey = vs[i].key
                    pos[nameKey] = [x, y]

        for v in self.G.vertices.values():
            if v not in vs:
                newG.removeVertex(v.key)
        return newG, pos

    # Cria um grafo usando a biblioteca networkx e salva ele

    def saveGraphImg(self, userName, levels=None):
        user = self.getUser(userName)
        if levels:
            subgraph, pos = self.subGraph(user, levels)
        else:
            subgraph = self.G
        DG = nx.DiGraph()
        for node in subgraph.vertices.keys():
            DG.add_node(node)
        edges = subgraph.getEdges()

        for v1, v2, w in edges:
            if w == "Friend":
                color = "red"
            elif w == "Acquaintance":
                color = "blue"
            elif w == "Family":
                color = "green"
            else:
                color = "black"
            DG.add_edge(v1, v2, color=color)
        if levels and levels >= 3:

            pos = nx.circular_layout(DG)

        if not levels:
            pos = nx.circular_layout(DG)
        pos[userName] = [0, 0]
        edges = DG.edges()
        colors = [DG[u][v]['color'] for u, v in edges]
        nx.draw(DG, pos, with_labels=True, edge_color=colors)
        legend_elements = [
            Line2D([0], [0], marker='o', color='w', label='Família',
                   markerfacecolor='g', markersize=8),
            Line2D([0], [0], marker='o', color='w', label='Amigo',
                   markerfacecolor='r', markersize=8),
            Line2D([0], [0], marker='o', color='w', label='Conhecido',
                   markerfacecolor='blue', markersize=8),
            Line2D([0], [0], marker='o', color='w', label='Cliente',
                   markerfacecolor='black', markersize=8),
        ]
        plt.legend(handles=legend_elements, loc='upper right')
        plt.savefig("files/graph.jpg")
        plt.clf()
